const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const { execSync } = require('child_process');

const packageName = process.argv[3]; // core notify pickup presence livestatus
const platform = process.argv[4]; // android ios

let sourceFolderPath = path.join(__dirname, `../node_modules/react-native-bildit-flybuy-${packageName}` );
let destinationFolderPath = path.join(__dirname, `../../mono/packages/${packageName}`);
if (platform) {
  sourceFolderPath = sourceFolderPath + '/' + platform
  destinationFolderPath = destinationFolderPath + '/' + platform
}



// Initialize chokidar to watch the folder for changes
const watcher = chokidar.watch(sourceFolderPath);

watcher.on('change', (filePath) => {
    console.log(`${filePath} has changed`);
    
    // Copy the folder to the destination path
    execSync(`cp -R ${path.join(sourceFolderPath, '*')} ${destinationFolderPath}`);

    console.log('Folder copied successfully');
});

console.log(`Watching folder: ${sourceFolderPath}`);
