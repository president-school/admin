
import ContentLoader from "react-content-loader";

const MyLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={330}
    height={500}
    viewBox="0 0 340 500"
    backgroundColor="#7e8091"
    foregroundColor="#8b8792"
    {...props}
  >
    <rect x="80" y="162" rx="0" ry="0" width="1" height="2" />
    <rect x="198" y="92" rx="0" ry="0" width="1" height="0" />
    <rect x="199" y="91" rx="0" ry="0" width="1" height="0" />
    <rect x="396" y="15" rx="0" ry="0" width="211" height="221" />
    <rect x="332" y="104" rx="0" ry="0" width="152" height="3" />
    <rect x="0" y="0" rx="11" ry="11" width="338" height="226" />
    <rect x="2" y="238" rx="11" ry="11" width="300" height="45" />
    <rect x="5" y="301" rx="11" ry="11" width="250" height="20" />
    <rect x="10" y="350" rx="11" ry="11" width="200" height="20" />
    <rect x="8" y="392" rx="11" ry="11" width="320" height="20" />
  </ContentLoader>
);

export default MyLoader;
