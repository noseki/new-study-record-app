export const ShowRecords = ({records, onClickDelete}) => {
    return (
        <>
        <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.title} {record.time}時間
            <button style={{ marginLeft: "8px" }} onClick={() => onClickDelete(record.id)}>削除</button>
          </li>
        ))}
      </ul>
        </>
    )
};
