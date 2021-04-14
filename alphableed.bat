@echo off
cd %~dp0\sprites
call :treeProcess
exit /b

:treeProcess
for %%f in (*.png) do (
    ab.exe -r %%f
)
for /D %%d in (*) do (
    cd %%d
    copy /y %~dp0\alp*.exe ab.exe
    call :treeProcess
    del ab.exe
    cd ..
)
exit /b
