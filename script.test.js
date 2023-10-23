/**
* @jest-environment jsdom
*/
const script = require('./script');
test('functions called as expected', () => {
    document.body.innerHTML = `
        <select id="beds" name="beds" class="dropdown">
        </select>
        <button type="submit"></button>
        <div id="search-results"></div>
    `;
    const bedInput = document.getElementById('beds');
    const submit = document.getElementsByClassName("search-button");
    const results = document.getElementById('search-results');
    expect(results.innerHTML).toBe("");
});
