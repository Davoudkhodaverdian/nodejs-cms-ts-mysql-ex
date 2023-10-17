
const transform = (dataItem, items: string[]) => {

    let trnasformedDataItem = {};
    items.map((item: string) => { trnasformedDataItem[item] = dataItem?.[item] })
    return trnasformedDataItem;
}

export default transform;