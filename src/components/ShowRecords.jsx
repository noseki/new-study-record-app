export const ShowRecords = ({records}) => {

    return (
        <>
        <ul>
        {records.map((record, index) => (
          <li key={index}>
            {record.title} {record.time}時間
          </li>
        ))}
      </ul>
        </>
    )
};
