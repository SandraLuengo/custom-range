
const fetchData = async () => {
    const apiCall = await fetch("http://demo0922089.mockable.io/exercise1");
    const prices = await apiCall.json();
    return prices.price;
};

export default fetchData;
