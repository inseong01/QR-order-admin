const initialState = {
  tab: {
    id: 0,
    title: 'menu'
  }
}

export const useTabSlice = (set) => ({
  ...initialState,
  changeTabState: ({ tableId }) => set(() => {
    let title = ''
    switch (tableId) {
      case 0: {
        title = 'menu';
        break;
      }
      case 1: {
        title = 'table'
        break;
      }
      case 2: {
        title = 'order';
        break;
      }
      default: {
        title = 'menu';
        console.error('There is no correct tabeId')
      }
    }
    return {
      tab: {
        id: tableId,
        title,
      }
    }
  })
})