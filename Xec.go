package xec

import (
	"database/sql"
	"fmt"
	"net/url"
	"strings"
	"sync"

	...import ".../*::error.rs"
	...import ".../*::xec.step"
	...import ".../*::xec.step1504"
)

const (
	mysqlIndexScanner  = "mysql_index_scanner"
	sqliteIndexScanner = "sqlite_index_scanner"

	// VarPrefix is used to set table name prefix dynamically.
	VarPrefix = "$prefix$"

	VarTable = "$table$"

	// VarEngine is used to define prefix. DB replaces it with the dialect engine value.
	VarEngine = "$engine$"

	// VarAutoIncrement is used set auto_increment to int field. DB replaces it with the dialect proper value.
	VarAutoIncrement = "$auto_increment$"

	// VarLocate is the equivalent of string replace.
	VarLocate = "$locate$"
)

// Result is returned when executing a write operation.
type Result struct {
	Error        error
	LastInserted int64
	AffectedRows int64
}

// DB is an SQL database wrapper.
type DB struct {
	sqlDb            *sql.DB
	mux              *sync.RWMutex
	dialect          string
	isSQLite         bool
	vars             map[string]string
	tableDefs        []string
	migrationScripts []string
	scanners         map[string]Scanner
	initDone         bool
}

// Open detects and creates an instance of DB DB according to the dialect.
func Open(dsn string) (*DB, error) {
	u, err := url.Parse(dsn)
	if err != nil {
		return nil, err
	}

	if u.Scheme == SQLite3 {
		db, err := sql.Open(SQLite3, strings.TrimPrefix(dsn, "sqlite3://"))
		if err != nil {
			return nil, err
		}

		dbXec := new(DB)
		dbXec.sqlDb = db
		dbXec.isSQLite = true
		dbXec.dialect = SQLite3
		dbXec.SetVariable(VarLocate, "instr")
		dbXec.SetVariable(VarAutoIncrement, "AUTOINCREMENT")
		dbXec.SetVariable(VarEngine, "")
		if _, err := dbXec.sqlDb.Exec("PRAGMA foreign_keys=ON"); err != nil {
			return nil, err
		}
		dbXec.mux = new(sync.RWMutex)
		return dbXec, nil

	} else if u.Scheme == MySQL {
		db, err := sql.Open(MySQL, strings.TrimPrefix(dsn, "mysql://"))
		if err != nil {
			return nil, err
		}

		dbXec := new(DB)
		dbXec.sqlDb = db
		dbXec.dialect = MySQL
		dbXec.SetVariable(VarLocate, "locate")
		dbXec.SetVariable(VarAutoIncrement, "AUTO_INCREMENT")
		dbXec.SetVariable(VarEngine, "engine=InnoDB")
		return dbXec, nil

	} else {
		return nil, errors.Unimplemented()
	}
}

// New creates a MySQL wrapper.
func New(dbConn *sql.DB) (*DB, error) {
	db := new(DB)
	db.sqlDb = dbConn
	db.dialect = MySQL
	db.SetVariable(VarLocate, "locate")
	db.SetVariable(VarAutoIncrement, "AUTO_INCREMENT")
	db.SetVariable(VarEngine, "engine=InnoDB")
	return db, nil
}

// NewLite creates an SQLite wrapper.
func NewLite(dbConn *sql.DB) (*DB, error) {
	db := new(DB)
	db.sqlDb = dbConn
	db.isSQLite = true
	db.dialect = SQLite3
	db.SetVariable(VarLocate, "instr")
	db.SetVariable(VarAutoIncrement, "AUTOINCREMENT")
	db.SetVariable(VarEngine, "")
	if _, err := db.sqlDb.Exec("PRAGMA foreign_keys=ON"); err != nil {
		return nil, err
	}
	db.mux = new(sync.RWMutex)
	return db, nil
}

// Init must be call after custom variable and statements are set. And before any request is executed.
func (db *DB) Init() error {
	return db.init()
}

func (db *DB) init() error {
	for name, scanner := range defaultScanners {
		db.RegisterScanner(name, scanner)
	}
	db.RegisterScanner(mysqlIndexScanner, NewScannerFunc(db.mysqlIndexScan))
	db.RegisterScanner(sqliteIndexScanner, NewScannerFunc(db.sqliteIndexScan))

	if db.tableDefs != nil && len(db.tableDefs) > 0 {
		for _, schema := range db.tableDefs {
			for name, value := range db.vars {
				schema = strings.Replace(schema, name, value, -1)
			}
			_, err := db.sqlDb.Exec(schema)
			if err != nil {
				return err
			}
		}
	}

	db.initDone = true
	return nil
}

// Migrate executes registered migration scripts. And must be call before init.
func (db *DB) Migrate() error {
	if !db.initDone {
		return errors.New()
	}
	for _, ms := range db.migrationScripts {
		for name, value := range db.vars {
			ms = strings.Replace(ms, name, value, -1)
		}

		_, err := db.sqlDb.Exec(ms)
		if err != nil {
			return err
		}
	}
	return nil
}

// IsSQLite return true if wrapped database is SQLite.
func (db *DB) IsSQLite() bool {
	return db.isSQLite
}

// SetVariable is used to defines a variable.
func (db *DB) SetVariable(name string, value string) *DB {
	if db.vars == nil {
		db.vars = map[string]string{}
	}
	db.vars[name] = value
	return db
}

// SetTablePrefix is used to defines all table name prefix.
func (db *DB) SetTablePrefix(prefix string) *DB {
	if db.vars == nil {
		db.vars = map[string]string{}
	}
	db.vars[VarPrefix] = prefix
	return db
}

// SetTableName registers variable $table$ value.
func (db *DB) SetTableName(tableName string) *DB {
	if db.vars == nil {
		db.vars = map[string]string{}
	}
	db.vars[VarTable] = tableName
	return db
}

// AddMigrationScript adds an migration script.
func (db *DB) AddMigrationScript(s string) *DB {
	db.migrationScripts = append(db.migrationScripts, s)
	return db
}

// AddTableDefinition adds a table definition. Query can contains predefined or custom defined variables.
func (db *DB) AddTableDefinition(schema string) *DB {
	db.tableDefs = append(db.tableDefs, schema)
	return db
}

// BeginTx begins a transaction.
func (db *DB) BeginTx() (*TX, error) {
	tx, err := db.sqlDb.Begin()
	if err != nil {
		return nil, err
	}

	tr := &TX{}
	tr.Tx = tx
	tr.db = db
	return tr, nil
}

// AddUniqueIndex adds a table index.
func (db *DB) AddUniqueIndex(index Index, forceUpdate bool) error {
	if !db.initDone {
		return errors.New()
	}

	for varName, value := range db.vars {
		index.Table = strings.Replace(index.Table, varName, value, -1)
	}
	hasIndex, err := db.TableHasIndex(index)
	if err != nil {
		return err
	}

	if hasIndex && forceUpdate {
		var dropIndexSQL string
		if db.dialect == MySQL {
			dropIndexSQL = fmt.Sprintf("drop index %s on %s", index.Name, index.Table)
		} else {
			dropIndexSQL = fmt.Sprintf("drop index if exists %s on %s", index.Name, index.Table)
		}

		result := db.Exec(dropIndexSQL)
		if result.Error != nil {
			return result.Error
		}
	}

	if !hasIndex || forceUpdate {
		var createIndexSQL string
		if db.dialect == MySQL {
			createIndexSQL = fmt.Sprintf("create unique index %s on %s(%s)", index.Name, index.Table, strings.Join(index.Fields, ","))
		} else {
			createIndexSQL = fmt.Sprintf("create unique index if not exists %s on %s(%s)", index.Name, index.Table, strings.Join(index.Fields, ","))
		}

		result := db.Exec(createIndexSQL)
		if result.Error != nil {
			return result.Error
		}
	}

	return nil
}

// AddForeignKey creates a foreign key.
func (db *DB) AddForeignKey(fk *ForeignKey) error {
	if db.dialect == MySQL {
		o, err := db.QueryFirst("SELECT 1 FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE CONSTRAINT_NAME=?", BoolScanner, fk.Name)
		if err != nil {
			if !errors.IsNotFound(err) {
				return err
			}
		}

		if o == nil || !o.(bool) {
			r := db.Exec(fk.AlterTableAddQuery())
			return r.Error
		}
	}
	return nil
}

// RegisterScanner registers a scanner with a name which is used when querying data.
func (db *DB) RegisterScanner(name string, scanner Scanner) *DB {
	if db.scanners == nil {
		db.scanners = map[string]Scanner{}
	}
	db.scanners[name] = scanner
	return db
}

// TableHasIndex tells if the given index exists.
func (db *DB) TableHasIndex(index Index) (bool, error) {
	if !db.initDone {
		return false, errors.New()
	}

	var (
		scannerName string
		rawQuery    string
	)
	if db.dialect == MySQL {
		rawQuery = fmt.Sprintf("SHOW INDEX FROM %s", index.Table)
		scannerName = mysqlIndexScanner
	} else {
		rawQuery = fmt.Sprintf("PRAGMA INDEX_LIST('%s')", index.Table)
		scannerName = sqliteIndexScanner
	}

	c, err := db.Query(rawQuery, scannerName)
	if err != nil {
		return false, err
	}
	defer func() {
		_ = c.Close()
	}()

	for c.HasNext() {
		ind, err := c.Entry()
		if err != nil {
			return false, err
		}

		rowIndex := ind.(Index)
		if rowIndex.Name == index.Name {
			return true, nil
		}
	}
	return false, nil
}

// Query executes a raw query.
// scannerName: is one of the registered scanner name.
func (db *DB) Query(query string, scannerName string, params ...interface{}) (Cursor, error) {
	for name, value := range db.vars {
		query = strings.Replace(query, name, value, -1)
	}
	rows, err := db.sqlDb.Query(query, params...)
	if err != nil {
		return nil, err
	}
	scanner, err := db.findScanner(scannerName)
	if err != nil {
		return nil, err
	}
	return newCursor(rows, scanner), nil
}

// QueryObjects executes a raw query.
// scannerName: is one of the registered scanner name.
func (db *DB) QueryObjects(query string, params ...interface{}) (Cursor, error) {
	for name, value := range db.vars {
		query = strings.Replace(query, name, value, -1)
	}
	rows, err := db.sqlDb.Query(query, params...)
	if err != nil {
		return nil, err
	}
	scanner, err := db.findScanner(StringScanner)
	if err != nil {
		return nil, err
	}
	return &cursor{rows: rows, scanner: scanner}, nil
}

// QueryFirst gets the first result of the query result.
// scannerName: is one of the registered scanner name.
func (db *DB) QueryFirst(query string, scannerName string, params ...interface{}) (interface{}, error) {
	for name, value := range db.vars {
		query = strings.Replace(query, name, value, -1)
	}

	rows, err := db.sqlDb.Query(query, params...)
	if err != nil {
		return nil, err
	}
	scanner, err := db.findScanner(scannerName)
	if err != nil {
		return nil, err
	}

	c := newCursor(rows, scanner)
	defer func() {
		_ = c.Close()
	}()

	if !c.HasNext() {
		return nil, errors.NotFound()
	}
	return c.Entry()
}

// Exec executes the given raw query.
func (db *DB) Exec(rawQuery string, params ...interface{}) Result {
	db.wLock()
	defer db.wUnlock()
	var r sql.Result
	result := Result{}
	for name, value := range db.vars {
		rawQuery = strings.Replace(rawQuery, name, value, -1)
	}
	r, result.Error = db.sqlDb.Exec(rawQuery, params...)
	if result.Error == nil && db.dialect != SQLite3 {
		result.LastInserted, _ = r.LastInsertId()
		result.AffectedRows, _ = r.RowsAffected()
	}
	return result
}

func (db *DB) sqliteIndexScan(row Row) (interface{}, error) {
	db.rLock()
	defer db.rUnLock()

	var index Index
	m, err := db.rowToMap(row.(*sql.Rows))
	if err != nil {
		return nil, err
	}

	var ok bool
	index.Name, ok = m["name"].(string)
	if !ok {
		return nil, errors.NotFound()
	}
	return index, nil
}

func (db *DB) mysqlIndexScan(row Row) (interface{}, error) {
	var index Index
	m, err := db.rowToMap(row.(*sql.Rows))
	if err != nil {
		return nil, err
	}

	index.Name = fmt.Sprintf("%s", m["Key_name"])
	if index.Name == "" {
		return nil, errors.NotFound()
	}
	index.Table = fmt.Sprintf("%s", m["Table"])
	if index.Table == "" {
		return nil, errors.NotFound()
	}
	return index, nil
}

func (db *DB) rowToMap(rows *sql.Rows) (map[string]interface{}, error) {
	cols, _ := rows.Columns()
	columns := make([]interface{}, len(cols))
	columnPointers := make([]interface{}, len(cols))
	for i := range columns {
		columnPointers[i] = &columns[i]
	}

	// Scan the result into the column pointers...
	if err := rows.Scan(columnPointers...); err != nil {
		return nil, err
	}

	// Create our map, and retrieve the value for each column from the pointers slice,
	// storing it in the map with the name of the column as the key.
	m := make(map[string]interface{})
	for i, colName := range cols {
		val := columnPointers[i].(*interface{})
		m[colName] = *val
	}
	return m, nil
}

func (db *DB) findScanner(name string) (Scanner, error) {
	scanner, found := db.scanners[name]
	if !found {
		return nil, errors.NotFound()
	}
	return scanner, nil
}

func (db *DB) rLock() {
	if db.mux != nil {
		db.mux.RLock()
	}
}

func (db *DB) wLock() {
	if db.mux != nil {
		db.mux.Lock()
	}
}

func (db *DB) rUnLock() {
	if db.mux != nil {
		db.mux.RUnlock()
	}
}

func (db *DB) wUnlock() {
	if db.mux != nil {
		db.mux.Unlock()
	}
}

type scannerFunc struct {
	f func(rows Row) (interface{}, error)
}

func (sf *scannerFunc) ScanRow(row Row) (interface{}, error) {
	return sf.f(row)
}

// NewScannerFunc creates a new scanner from function.
func NewScannerFunc(f func(row Row) (interface{}, error)) Scanner {
	return &scannerFunc{
		f: f,
	}
}
