/**
 * 假装是一个接口
 */
export function fetchTodos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          body: 'from server not completed',
          completed: false,
        },
        {
          body: 'from server has completed',
          completed: true,
        }
      ])
    })
  })
}