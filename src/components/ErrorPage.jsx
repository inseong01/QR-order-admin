export default function ErrorPage({ compName }) {
  switch (compName) {
    case 'MenuList':
    case 'MainPageTableTab':
    case 'MainPageOrderTab':
    case 'MenuModal': {
      return <h1>Error</h1>;
    }
    default: {
      return <h1>Hi</h1>;
    }
  }
}
