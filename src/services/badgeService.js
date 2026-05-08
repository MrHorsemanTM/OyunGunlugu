// Rozet mantığını buraya taşıdım ki test edilebilsin
const getBadgeName = (rating) => {
    const r = parseInt(rating);
    if (r === 0) return "Kırık";
    if (r === 1) return "Bakır";
    if (r === 2) return "Gümüş";
    if (r === 3) return "Altın";
    if (r === 4) return "Zümrüt";
    if (r >= 5) return "Elmas";
    return "Yok";
};

module.exports = { getBadgeName };