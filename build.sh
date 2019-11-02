cd ./client
npm run build
cp -r build ../backend
cd ../backend
git add .
git commit -m "new build"
git push
echo press any button to launch app
read -n1 answer 
/mnt/c/Program\ Files\ \(x86\)/Google/Chrome/Application/chrome.exe https://class-scheduler-prod.herokuapp.com/
