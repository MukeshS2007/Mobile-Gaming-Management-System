@echo off
setlocal
set "JAVA_HOME=C:\Users\Mukesh\.jdks\openjdk-26.0.1"
call "D:\IntelliJ IDEA 2026.1.3\plugins\maven\lib\maven3\bin\mvn.cmd" -f "%~dp0pom.xml" spring-boot:run
