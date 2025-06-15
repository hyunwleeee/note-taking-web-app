import data from '/data.json';

function HomePage() {
  return <div>{JSON.stringify(data)}</div>;
}

export default HomePage;
