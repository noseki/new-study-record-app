import { useEffect, useState } from 'react'
import './index.css'
import { InputRecord } from './components/InputRecord';
import { ShowRecords } from './components/ShowRecords';

import {supabase} from "./supabaseClient";

export function StudyRecord() {
  const db_name = "study-record";
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeTitle = (event) => setTitle(event.target.value);
  const onChangeTime = (event) => setTime(parseInt(event.target.value, 10));

  // supabaseから学習記録を取得
  const getAllRecords = async () => {
    const { data, error } = await supabase.from(db_name).select("*");
    if (error) {
      console.log(error);
      return;
    }

    setRecords(data);
    setTotalTime(data.reduce((accumulator, record) => accumulator + record.time, 0));
    setIsLoading(false);
  };

  // 学習記録を表示
  useEffect(() => {
    getAllRecords();
  }, []);

  const onClickAdd = async () => {
    if (!title || !time) {
      setError("入力されていない項目があります");
      return;
    }

    try {
      // 学習記録をsupabaseにインサート
      const { error } = await supabase.from(db_name).insert({ title, time });
      if (error) throw new Error(error);

      getAllRecords();
      setError("");

    } catch(error) {
      console.error(`登録エラー：${error}`);
      setError("登録に失敗しました。再度お試しください。");

    } finally {
      // 値の初期化
      setTitle("");
      setTime(0);
    }
  };

  const onClickDelete = async (id) => {
    const { error } = await supabase.from(db_name).delete().match({id});
    if (error) {
      setError("削除処理に失敗しました。再度お試しください。");
      console.log(error);
      return;
    }
    getAllRecords();
    setError("");
  };

  return (
      isLoading ? (<div>Loading...</div>) : (
      <>
        <h1>学習記録一覧</h1>
        <InputRecord title={title} time={time} onChangeTitle={onChangeTitle} onChangeTime={onChangeTime} />
        <ShowRecords records={records} onClickDelete={onClickDelete}/>
        <button onClick={onClickAdd}>登録</button>
        <p style={{ color: 'red' }}>{error}</p>
        <p>合計時間：{totalTime} / 1000 (h)</p>
      </>
      )
  )
}
