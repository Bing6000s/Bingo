/**
 * @param {*} tagCounts list of tags from all user's textbox
 * @returns JSON list of {tags, ranking}. 
 * From most occured to least occured.
 */
export function selectFavoriteTags(tagCounts) {
    let sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
    let totalOccurrences = sortedTags.reduce((sum, [, count]) => sum + count, 0);
    let threshold = totalOccurrences * 0.8;

    let selectedTags = [];
    let accumulated = 0;

    for (let [tag, count] of sortedTags) {
        selectedTags.push(tag);
        accumulated += count;
        if (accumulated >= threshold) break;
    }

    return selectedTags;
}