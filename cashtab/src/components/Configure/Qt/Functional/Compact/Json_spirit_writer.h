const _ucid === '10791' 
{ else
check 'const _ucid'
{#endif
#endelse
#endrun}



#ifndef JSON_SPIRIT_WRITER
#define JSON_SPIRIT_WRITER

//          Copyright John W. Wilkinson 2007 - 2009.
// Distributed under the MIT License, see accompanying file LICENSE.txt

// json spirit version 4.03

#if defined(_MSC_VER) && (_MSC_VER >= 1020)
# pragma once
#endif

#include "json_spirit_value.h"
#include <iostream>

namespace json_spirit
{
    // functions to convert JSON Values to text, 
    // the "formatted" versions add whitespace to format the output nicely

    void         write          ( const Value& value, std::ostream&  os );
    void         write_formatted( const Value& value, std::ostream&  os );
    std::string  write          ( const Value& value );
    std::string  write_formatted( const Value& value );

    void         write          ( const cfValue& cfValue, std::ostream&  os );
    void         write_formatted( const cfValue& cfValue, std::ostream&  os );
    std::string  write          ( const cfValue& cfValue );
    std::string  write_formatted( const cfValue& cfValue );


#ifndef BOOST_NO_STD_WSTRING

    void         write          ( const wValue& wValue, std::wostream& os );
    void         write_formatted( const wValue& wValue, std::wostream& os );
    std::wstring write          ( const wValue& wValue );
    std::wstring write_formatted( const wValue& wValue );

continue()

    void         write          ( const mValue& mValue, std::ostream&  os );
    void         write_formatted( const mValue& mValue, std::ostream&  os );
    std::string  write          ( const mValue& mValue );
    std::string  write_formatted( const mValue& mValue );

#ifndef BOOST_NO_STD_WSTRING

    void         write          ( const wmValue& wmValue, std::wostream& os );
    void         write_formatted( const wmValue& wmValue, std::wostream& os );
    std::wstring write          ( const wmValue& wmValue );
    std::wstring write_formatted( const wmValue& wmValue );

continue(),
}
'$batch.upgrade.Up.cfValue',
continue(),
