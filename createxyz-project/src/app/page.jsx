"use client";
import { useState, useEffect } from 'react';

function MainComponent() {
  // 検索条件（フィルタ・ページング）
  const [searchParams, setSearchParams] = useState({
    status: "",
    name: "",
    shop_id: "",
    tel: "",
    pref_code: "",
    address: "",
    page: 1,
    limit: 50,
  });
  // APIから取得した全件データ
  const [allShops, setAllShops] = useState([]);
  // 表示用（フィルタ適用後）のデータ
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // 初回のみ全店舗情報を取得
  useEffect(() => {
    async function fetchShops() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/shops");
        if (!response.ok) {
          throw new Error("ショップ情報の取得に失敗しました");
        }
        const data = await response.json();
        setAllShops(data.shops);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchShops();
  }, []);

  // allShops と検索条件に基づき、クライアント側でフィルタ処理＋ページングを実施
  useEffect(() => {
    if (!allShops || allShops.length === 0) {
      setShops([]);
      setTotalPages(1);
      return;
    }

    let filtered = allShops;

    // ステータス（登録済／未登録）のフィルタ
    if (searchParams.status) {
      filtered = filtered.filter(shop =>
        (shop.start_date ? "登録済" : "未登録") === searchParams.status
      );
    }
    // 店舗名フィルタ（部分一致、大小文字を区別しない）
    if (searchParams.name) {
      filtered = filtered.filter(shop =>
        shop.name && shop.name.toLowerCase().includes(searchParams.name.toLowerCase())
      );
    }
    // 店舗IDフィルタ（完全一致）
    if (searchParams.shop_id) {
      filtered = filtered.filter(shop => shop.id === Number(searchParams.shop_id));
    }
    // 電話番号フィルタ（部分一致）
    if (searchParams.tel) {
      filtered = filtered.filter(shop =>
        shop.tel && shop.tel.includes(searchParams.tel)
      );
    }
    // 都道府県コードフィルタ（数値比較、※shopオブジェクトにpref_codeがある前提）
    if (searchParams.pref_code) {
      filtered = filtered.filter(shop => shop.pref_code === Number(searchParams.pref_code));
    }
    // 住所フィルタ（部分一致、大小文字区別なし）
    if (searchParams.address) {
      filtered = filtered.filter(shop =>
        shop.address && shop.address.toLowerCase().includes(searchParams.address.toLowerCase())
      );
    }

    // ページング：全件数から総ページ数を算出
    const total = Math.ceil(filtered.length / searchParams.limit);
    setTotalPages(total);

    // 現在のページに対応するデータのみ抽出
    const startIndex = (searchParams.page - 1) * searchParams.limit;
    const paginated = filtered.slice(startIndex, startIndex + searchParams.limit);
    setShops(paginated);
  }, [allShops, searchParams]);

  const handleInputChange = (name, value) => {
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
      page: 1, // フィルタ変更時はページを1にリセット
    }));
  };

  const clearSearch = () => {
    setSearchParams({
      status: "",
      name: "",
      shop_id: "",
      tel: "",
      pref_code: "",
      address: "",
      page: 1,
      limit: 50,
    });
  };

  const prefectures = [
    { code: "", name: "選択してください" },
    { code: 1, name: "北海道" },
    { code: 13, name: "東京都" },
  ];

  const renderTableContent = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="9" className="px-4 py-8 text-center">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3b82f6]"></div>
            </div>
          </td>
        </tr>
      );
    }
    if (!shops || shops.length === 0) {
      return (
        <tr>
          <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
            検索結果がありません
          </td>
        </tr>
      );
    }
    return shops.map((shop) => (
      <tr key={shop.id} className="hover:bg-[#f1f5f9] transition-colors">
        <td className="px-4 py-4 text-sm text-gray-700">
          {shop.start_date ? "登録済" : "未登録"}
        </td>
        <td className="px-4 py-4 text-sm text-gray-700">{shop.id}</td>
        <td className="px-4 py-4 text-sm text-gray-700">
          {shop.name}
          <br />
          <span className="text-gray-400">{shop.name_kn}</span>
        </td>
        <td className="px-4 py-4 text-sm text-gray-700">
          {shop.address}
          <br />
          <span className="text-gray-400">{shop.tel}</span>
        </td>
        <td className="px-4 py-4 text-sm text-gray-700">
          {shop.contract_date}
          {shop.finish_date && (
            <>
              <br />
              {shop.finish_date}
            </>
          )}
        </td>
        <td className="px-4 py-4 text-sm text-gray-700">{shop.start_date}</td>
        <td className="px-4 py-4 text-sm text-gray-700">
          {shop.fee_initial?.toLocaleString()}円
        </td>
        <td className="px-4 py-4 text-sm text-gray-700">
          {shop.fee_monthly?.toLocaleString()}円
          <br />
          {shop.fee_connect > 0 && (
            <span className="text-gray-400">
              {shop.fee_connect.toLocaleString()}円
            </span>
          )}
        </td>
        <td className="px-4 py-4 text-right">
          <button className="text-[#3b82f6] hover:text-[#2563eb] transition-colors">
            編集
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#f5f7fa]">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              ステータス
            </label>
            <select
              name="status"
              value={searchParams.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#3b82f6] focus:ring focus:ring-[#3b82f6] focus:ring-opacity-50"
            >
              <option value="">全て</option>
              <option value="未登録">未登録</option>
              <option value="登録済">登録済</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              店舗名
            </label>
            <input
              type="text"
              name="name"
              value={searchParams.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#3b82f6] focus:ring focus:ring-[#3b82f6] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              店舗ID
            </label>
            <input
              type="number"
              name="shop_id"
              value={searchParams.shop_id}
              onChange={(e) => handleInputChange("shop_id", e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#3b82f6] focus:ring focus:ring-[#3b82f6] focus:ring-opacity-50"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              電話番号
            </label>
            <input
              type="tel"
              name="tel"
              value={searchParams.tel}
              onChange={(e) => handleInputChange("tel", e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#3b82f6] focus:ring focus:ring-[#3b82f6] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              都道府県
            </label>
            <select
              name="pref_code"
              value={searchParams.pref_code}
              onChange={(e) => handleInputChange("pref_code", e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#3b82f6] focus:ring focus:ring-[#3b82f6] focus:ring-opacity-50"
            >
              {prefectures.map((pref) => (
                <option key={pref.code} value={pref.code}>
                  {pref.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              住所
            </label>
            <input
              type="text"
              name="address"
              value={searchParams.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-[#3b82f6] focus:ring focus:ring-[#3b82f6] focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={clearSearch}
            className="px-4 py-2 border border-[#3b82f6] rounded-md text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-colors"
          >
            クリア
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8fafd]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  ステータス
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  店舗ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  店舗名（カナ）
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  住所（電話番号）
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  契約日（解約日）
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  課金開始日
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  初期費用（税抜）
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  月額費用/接続費用（税抜）
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {renderTableContent()}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center px-4 py-3 border-t border-gray-100">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handleInputChange("page", page)}
                className={`mx-1 px-3 py-1 rounded-md ${
                  searchParams.page === page
                    ? "bg-[#3b82f6] text-white"
                    : "text-gray-600 hover:bg-[#f1f5f9] transition-colors"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;

