@echo off
chcp 866 > nul
echo ===============================================
echo Building and signing APK for SwipeVPN...
echo ===============================================

REM Check if keystore exists
if not exist "./android/app/swipevpn-release.keystore" (
    echo ERROR: Keystore file not found!
    echo First create a key using command:
    echo keytool -genkeypair -v -storetype PKCS12 -keystore android/app/swipevpn-release.keystore -alias swipevpn-key -keyalg RSA -keysize 2048 -validity 10000
    pause
    exit /b 1
)

echo Cleaning previous builds...
cd android
call gradlew clean

echo Building release APK with signature...
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
copy app\build\outputs\apk\release\app-release.apk ..\release\swipeVPN-release.apk

echo Done! Signed APK saved in release directory as swipeVPN-release.apk
cd ..
pause 