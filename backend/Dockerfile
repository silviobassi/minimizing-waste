FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

COPY target/minimizing-waste-0.0.1-SNAPSHOT.jar /app/minimizing-api.jar
COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

EXPOSE 8080

CMD ["java", "-jar", "minimizing-api.jar"]