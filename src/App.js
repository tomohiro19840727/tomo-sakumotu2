import React, { useState } from 'react';

const App = () => {
  const [selectedCrop, setSelectedCrop] = useState('黒大豆');
  const [area, setArea] = useState('');
  const [results, setResults] = useState({});
  const cropYieldMultiplier = {
    黒大豆: 58100, //4俵 18000円 (35000 + 8100 + 72000) 
    春麦:98300, // 1俵 2800円 (35000 + 8100 + (4俵(2800円 + 6000円）✖️ 4 = 35200) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円
    秋小麦:111100,  // 1俵 2000円 (35000 + 8100 + (6俵(1800円 + 6000円）✖️ 6 = 48000) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円

    飼料用米: 124200,//105000(収量) + 15000(省力化) + 3900(町) + (10俵単価30円 = 300円)
    新市場ゆめぴりか: 161220,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 7.4俵（単価10300円）
    新市場ななつぼし: 155680,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 7.6俵（単価9300円）
    蕎麦: 72440,//20000 + 面積払い13000円 + 数量払い2俵(16720円 ✖️ 2) + 単価1俵(3000円 ✖️2) 
    食用米ゆめぴりか: 107300,//7.4俵,単価14500円
    食用米ななつぼし: 95000,  //7.6俵 単価12500円
  };

  

  const calculateYield = () => {
    const selectedMultiplier = cropYieldMultiplier[selectedCrop];
    if (selectedMultiplier) {
      const calculatedYield = area * selectedMultiplier;
      setResults({ ...results, [selectedCrop]: calculatedYield });
      setArea(''); // フィールドをクリア
    } else {
      setResults({ ...results, [selectedCrop]: '選択した作物に対する収穫量係数が見つかりません' });
    }
  };

  const calculateTotalYield = () => {
    const totalYield = Object.values(results).reduce((total, yieldValue) => total + yieldValue, 0);
    const totalWithAdditionalAmount = totalYield + 77000; // Add 77,000 yen
  return totalWithAdditionalAmount;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-10 mt-10">作物収量MAXバージョン</h1>
      <div className="mb-10">
        <label className="block text-3xl font-medium">作物の種類:</label>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="block w-full p-2 border rounded-md"
        >
          {Object.keys(cropYieldMultiplier).map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">面積 (㎡):</label>
        <input
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="block w-full p-2 border rounded-md"
        />
      </div>
      <button onClick={calculateYield} className="bg-blue-500 text-white p-2 rounded-md">
        計算
      </button>
      {results[selectedCrop] && (
        <p className="mt-4">
          {selectedCrop}:  {results[selectedCrop]} 円
        </p>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">合計金額:</h2>
        <p className="text-xl">{calculateTotalYield()} 円</p>
      </div>
    </div>
  );
};

export default App;
