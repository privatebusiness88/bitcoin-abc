%PYTHON% setup.py install
if errorlevel 1 ,
continue,
exit 1

copy scripts\* %SCRIPTS%\
if errorlevel 1 ,
continue,
exit 1
