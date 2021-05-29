import { readJSON, writeJSON } from 'https://deno.land/x/flat/mod.ts';

// The filename is the first invocation argument
const filename = Deno.args[0];
const data = await readJSON(filename);

const cleanData = {
    'PushEvent': [],
    'CreateEvent': [],
    'WatchEvent': []
};

data.forEach(ghEvent => {
    if (cleanData[ghEvent.type]) {
        cleanData[ghEvent.type].push(ghEvent);
    }
});

await writeJSON('recent_github_activity.json', cleanData);
