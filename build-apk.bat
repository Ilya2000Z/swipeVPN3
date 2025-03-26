@echo off
chcp 866 > nul
echo ===============================================
echo Building APK for SwipeVPN...
echo ===============================================

echo Cleaning previous builds...
cd android
call gradlew clean

echo Building release version of APK...
call gradlew assembleRelease

if %ERRORLEVEL% NEQ 0 (
    echo Error building APK! 
    pause
    exit /b %ERRORLEVEL%
)

echo ===============================================
echo APK successfully built!
echo APK file is located at: %cd%\app\build\outputs\apk\release\
echo ===============================================

echo Copying APK to project root directory...
mkdir ..\release
copy app\build\outputs\apk\release\app-release.apk ..\release\swipeVPN.apk

echo Done! APK saved in release directory as swipeVPN.apk
cd ..
pause 