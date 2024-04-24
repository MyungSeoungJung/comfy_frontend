//  시간 format
export const formatCreateTime = (createTime) => {
    if (!createTime) return ""; // 빈 값인 경우 빈 문자열 반환
    const date = new Date(createTime[0], createTime[1] - 1, createTime[2], createTime[3], createTime[4], createTime[5], createTime[6] / 1000000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);

    return `${year}.${month}.${day}`;
};