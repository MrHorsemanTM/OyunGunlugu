const { getBadgeName } = require('./src/services/badgeService');

describe('Rozet Sistemi Unit Testleri', () => {
    
    test('0 puan Kırık rozet döndürmeli', () => {
        expect(getBadgeName(0)).toBe("Kırık");
    });

    test('1 puan Bakır rozet döndürmeli', () => {
        expect(getBadgeName(1)).toBe("Bakır");
    });

    test('4 puan Zümrüt rozet döndürmeli', () => {
        expect(getBadgeName(4)).toBe("Zümrüt");
    });

    test('5 ve üzeri puan Elmas rozet döndürmeli', () => {
        expect(getBadgeName(5)).toBe("Elmas");
        expect(getBadgeName(10)).toBe("Elmas");
    });

    test('Hatalı girişlerde "Yok" döndürmeli', () => {
        expect(getBadgeName(-1)).toBe("Yok");
    });
});