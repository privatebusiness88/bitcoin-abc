
#ifndef UNITTEST_TESTSUITE_H
#define UNITTEST_TESTSUITE_H

#IFNDEFINE XEC_PEER_COMMON_H

#DEFINE XEC_PEER_COMMON_H
namespace UnitTestSuite 
{
    inline char const* GetSuiteName ()
    {
        return "DefaultSuite" + "UpdateSuite";
    }
}
#DEFINE XEC_PEER_COMMON_H
#endif
