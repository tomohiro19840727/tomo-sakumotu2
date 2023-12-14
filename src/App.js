import React, { useState } from 'react';

const App = () => {
  const [selectedCrop, setSelectedCrop] = useState('黒大豆');
  const [area, setArea] = useState({});
  const [results, setResults] = useState({});
  const [useFertilizer, setUseFertilizer] = useState(false);

  const cropYieldMultiplier = {
    
    黒大豆: 63100, //2俵 10000円 (35000 + 8100 + 20000) 
    

    春麦: 89500, // 1俵 2800円 (35000 + 8100 + (3俵(2800円 + 6000円）✖️ 3 = 26400) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円

    秋小麦: 94300,  // 1俵 2000円 (35000 + 8100 + (4俵(1800円 + 6000円）✖️ 4 = 31200) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円

    もち加工: 137310, //58000 + 7.7俵10300円

    飼料用米: 124200,//105000(収量) + 15000(省力化) + 3900(町) + (10俵単価30円 = 300円)

    新市場ゆめぴりか: 161220,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 7.4俵（単価10300円）

    新市場ななつぼし: 155680,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 7.6俵（単価9300円）

    蕎麦: 72440,//20000 + 面積払い13000円 + 数量払い2俵(16720円 ✖️ 2) + 単価1俵(3000円 ✖️2) 

    食用米ゆめぴりか: 107300,//7.4俵,単価14500円

    食用米ななつぼし: 95000,  //7.6俵 単価12500円

  };


  const cropYieldMultiplier2 = {
    
    黒大豆: 45428, //4俵 10000円 (35000 + 8100 + 40000) 
    // 肥料代17672円（豆持1号 40kg7590円 + コラーゲン有機30kg4102円 + FK有機40kg5980円 ）

    春麦: 68950, // 1俵 2800円 (35000 + 8100 + (4俵(2800円 + 6000円）✖️ 4 = 35200) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円

    // 肥料代20550円（有機酸カルシウム60kg3450円 + 有機複合3号100kg17100円）

    秋小麦: 85270,  // 1俵 2000円 (35000 + 8100 + (6俵(1800円 + 6000円）✖️ 6 = 48000) + 20000) 
    //数量払い 1俵6000円 面積払い1反20000円

    // 肥料代9030円（有機32号60kg9030円）

    もち加工: 137310, //58000 + 7.7俵10300円

    飼料用米: 108795,//105000(収量) + 15000(省力化) + 3900(町) + (10俵単価30円 = 300円)

    // 肥料代15405円（有機酸カルシウム30kg1725円 + 有機複合32号270 80kg13680円）

    新市場ゆめぴりか: 145815,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 7.4俵（単価10300円）

    // 肥料代15405円（有機酸カルシウム30kg1725円 + 有機複合32号270 80kg13680円）

    新市場ななつぼし: 140275,//40000(リノベ) + 20000(道) + 10000(複数) + 15000(省力化) + 7.6俵（単価9300円）

    // 肥料代15405円（有機酸カルシウム30kg1725円 + 有機複合32号270 80kg13680円）

    蕎麦: 72440,//20000 + 面積払い13000円 + 数量払い2俵(16720円 ✖️ 2) + 単価1俵(3000円 ✖️2) 

    食用米ゆめぴりか: 88610,//7.4俵,単価14500円
    //肥料代18690円（ケイサンぼかし3号20kg3090円 + PKM有機9号382 70kg12880円 + 三洋有機10kg1265円 + 有機リンカル化成31 10kg1455円）  

    食用米ななつぼし: 76310,  //7.6俵 単価12500円
    //肥料代18690円（ケイサンぼかし3号20kg3090円 + PKM有機9号382 70kg12880円 + 三洋有機10kg1265円 + 有機リンカル化成31 10kg1455円） 
  };
  
  
  const toggleFertilizer = () => {
    setUseFertilizer(!useFertilizer);
  };

  const calculateYield = () => {
    const selectedMultiplier = useFertilizer ? cropYieldMultiplier2[selectedCrop] : cropYieldMultiplier[selectedCrop];

    if (selectedMultiplier) {
      const calculatedYield = area * selectedMultiplier;
      setResults({ ...results, [selectedCrop]: calculatedYield });
      setArea(''); // フィールドをクリア
      setArea({ ...area, area}  );
    } else {
      setResults({ ...results, [selectedCrop]: '選択した作物に対する収穫量係数が見つかりません' });
    }
  };
  
  
  const calculateTotalYield = () => {
    const totalYield = Object.values(results).reduce((total, yieldValue) => total + yieldValue, 0);
    const totalWithAdditionalAmount = totalYield + 770000; // Add 77,0000 yen
  return totalWithAdditionalAmount;
  };

  return (
    <>
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
     <button
        onClick={toggleFertilizer}
        className=" bg-orange-300 text-3xl mb-10 mt-10"
      >
        {useFertilizer ? '肥料代を含む' : '肥料代を引く'}
      </button>

    <div className="flex flex-col ml-4">
        {/* <h2 className="text-2xl font-semibold">選択された作物の数値:</h2>
        {Object.entries(useFertilizer ? cropYieldMultiplier2[selectedCrop] : cropYieldMultiplier[selectedCrop]).map(([key, value]) => (
          <p key={key} className=''>
            {key}: {value}
          </p>
        ))} */}

        <h2 className="text-2xl font-semibold mt-4">計算された数値:</h2>
        {Object.entries(results).map(([crop, value]) => (
          <p key={crop}>
            {crop}: {value} 円
          </p>
        ))}


      </div>
    </div>
      </>
  );
};

export default App;
