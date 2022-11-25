# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- vue router 작동원리.

1. 작성한 `vue 코드를 compile하여 서버`에 올려 놓는다.
2. 서버에는 `html`과 `compile된 javascript` 파일들이 저장이 됨.
3. 서버에 `도메인`주소를 연결 시켜 놓음. ex) https://vercel.com/thisiswoo
4. 사용자가 도메인 주소에 해당 url을 작성 후 서버에 요청하게 되면, 서버는 해당 `html과 javascript`파일을 보내주고 브라우저는 해당 파일들을 다운 받는다.
5. `html`은 directory public > index.html
6. `js`는 js파일과 vue파일이 하나로 합쳐지고 모든 vue로 작성한 코드가 담겨 있다.(component 포함)
7. `a태그`의 경우로 이동하게 되면 `새로고침`이 되면서 서버에서 받았던 파일들을 다시 받아옴.
8. `vue router`을 사용하게 되면 서버에 요청되는 것을 가로채 url과 맡는 router를 찾아 해당 component를 브라우저에 보여줌. 즉, 서버에 요청하지 않고 url에 맡는 component를 보여줌.
9. 페이지를 이동할 때 받았던 html, js파일을 또 다시 받을 필요 없기 때문에 `a태그로 새로고침을 하는 것보다 router link를 사용하게 되면 빠르게 화면 전환이 일어나게 보여준다.`
10. 하지만 처음에 서버로 부터 받아오는 파일의 용량이 클 수 있기 때문에 처음 구동속도가 조금 느릴 수 있음.