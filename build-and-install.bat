@echo off
chcp 866 > nul
echo ===============================================
echo Building and installing APK for SwipeVPN...
echo ===============================================

echo Checking connected devices...
adb devices | findstr "device$" > nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Device not connected or USB debugging not enabled!
    echo Please connect your device and enable USB debugging.
    pause
    exit /b 1
)

echo Cleaning previous builds...
cd android
call gradlew clean

echo Building APK and installing to device...
call gradlew installDebug

if %ERRORLEVEL% NEQ 0 (
    echo Error building or installing APK! 
    pause
    exit /b %ERRORLEVEL%
)

echo ===============================================
echo APK successfully built and installed on device!
echo ===============================================

echo Launching application...
adb shell monkey -p com.swipevpn -c android.intent.category.LAUNCHER 1

echo Done!
cd ..
pause 