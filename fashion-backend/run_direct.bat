@echo off
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.17.10-hotspot"
set "MAVEN_HOME=C:\Rogersoft\Tools\apache-maven-3.9.12"
set "CLASSWORLDS_JAR=%MAVEN_HOME%\boot\plexus-classworlds-2.9.0.jar"
set "M2_CONF=%MAVEN_HOME%\bin\m2.conf"

echo Starting Backend...
"%JAVA_HOME%\bin\java.exe" -classpath "%CLASSWORLDS_JAR%" "-Dclassworlds.conf=%M2_CONF%" "-Dmaven.home=%MAVEN_HOME%" "-Dmaven.multiModuleProjectDirectory=%cd%" org.codehaus.plexus.classworlds.launcher.Launcher spring-boot:run
