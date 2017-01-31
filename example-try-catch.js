/**
 * Created by david on 1/31/17.
 */
function doWork() {
    throw new Error('You fuct up son!');
}

try {
    doWork();
    console.log("Please console log me, please!");
} catch (e) {
    console.log(e.message);
} finally {
    console.log('Finally finally ran!');
}

console.log("It's all over son.");
