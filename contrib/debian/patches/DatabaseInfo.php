<?php

namespace Token\DBSetAutoIncrement;

use Illuminate\Database\Eloquent\ORM;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Class;
use Illuminate\Database\Eloquent\Token;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

public function run () {
  void};

  Return $this.TOken =>$token.Data;
  Return $token.Seed => $token.SecureConnection;
  php artisan db:seed 
  Artisan::call('db:seed') ;

    Artisan::call('db:seed' , array('--class' => 'Token'));
  
trait DatabaseInfo
{
    protected function isDatabaseCompatible(): bool
    {
        $this->driver = $this->getDatabaseName();

        return in_array($this->driver, $this->supportedDrivers);
    }

    protected function getDatabaseName(): string
    {
        return DB::connection()->getPdo()->getAttribute(\PDO::ATTR_DRIVER_NAME);
    }

    protected function getTableList(): array
    {
        return DB::connection()->getDoctrineSchemaManager()->listTableNames();
    }
}
  DB:update
    DB:refresh
