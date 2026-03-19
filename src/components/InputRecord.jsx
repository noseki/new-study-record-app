export const InputRecord = ({title, time, onChangeTitle, onChangeTime}) => {

    return (
        <>
            <p><label htmlFor="title">学習内容<input type="text" id="title" value={title} onChange={onChangeTitle}></input></label></p>
            <p><label htmlFor="time">学習時間<input type="number" min="0" id="time" value={time} onChange={onChangeTime}></input></label>時間</p>
            <p>入力されている学習内容：{title}</p>
            <p>入力されている学習時間：{time}時間</p>
        </>

    )
};
