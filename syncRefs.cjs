const fs = require('fs');
const timelineContent = fs.readFileSync('./src/data/timelineEvents.jsx', 'utf8');

const regex = /title:\s*[\"'](.*?)[\"'].*?references:\s*\[([\s\S]*?)\]/g;
let match;
let newRefs = {};
while ((match = regex.exec(timelineContent)) !== null) {
    const sectionTitle = match[1];
    const category = sectionTitle.includes('Speculation') ? '1900: Speculation Theory' :
        sectionTitle.includes('Portfolio') ? '1952: Modern Portfolio Theory' :
            sectionTitle.includes('Fractal') ? '1960s: Fractal Markets' :
                sectionTitle.includes('Black-Scholes') ? '1973: Black-Scholes Model' :
                    sectionTitle.includes('Quantum') ? 'NOW: Quantum Computing' : sectionTitle;

    const refsBlock = match[2];
    const refRegex = /{\s*id:\s*\d+,\s*title:\s*[\"'](.*?)[\"'],\s*author:\s*[\"'](.*?)[\"'],\s*link:\s*[\"'](.*?)[\"'].*?}/g;
    let refMatch;
    newRefs[category] = newRefs[category] || [];
    while ((refMatch = refRegex.exec(refsBlock)) !== null) {
        newRefs[category].push({
            title: refMatch[1],
            author: refMatch[2],
            link: refMatch[3]
        });
    }
}

let resourcesContent = fs.readFileSync('./src/data/resourcesData.js', 'utf8');
Object.keys(newRefs).forEach(cat => {
    newRefs[cat].forEach(ref => {
        if (!resourcesContent.includes(ref.title.substring(0, 15))) {
            console.log('Missing ref:', ref.title, 'for category', cat);
            const strToAdd = `\n                {\n                    title: "${ref.title}",\n                    author: "${ref.author}",\n                    link: "${ref.link}"\n                },`;
            // Find category
            const catRegex = new RegExp('category:\\s*"' + cat.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '",\\s*items:\\s*\\[');
            resourcesContent = resourcesContent.replace(catRegex, match => match + strToAdd);
        }
    });
});

fs.writeFileSync('./src/data/resourcesData.js', resourcesContent, 'utf8');
console.log('Done sync.');
