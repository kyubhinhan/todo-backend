# Node.js 공식 이미지를 기반으로 설정
FROM node:20

# 애플리케이션 디렉토리 생성
WORKDIR /usr/src/app

# 애플리케이션 의존성 설치
# package.json 과 package-lock.json을 먼저 복사
COPY package*.json ./

RUN npm install
# 프로덕션을 위한 코드의 경우
# RUN npm ci --only=production

# 애플리케이션 코드를 이미지로 복사
COPY . .

# 앱이 사용하는 포트를 열기
EXPOSE 3001

# 애플리케이션 실행 명령
CMD [ "node", "index.js" ]