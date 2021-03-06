import {Socket} from "phoenix"

  let socket = new Socket("/socket", {params: {token: window.userToken}})

  socket.connect()
  const createSocket = (topicId) =>{
    let channel = socket.channel(`comments:${topicId}`, {})
    channel.join()
      .receive("ok", resp => {
        console.log("Bechir Joined sucessfully", resp);
        renderComments(resp.comments);
      })

      .receive("error", resp => { console.log("Unable to Join ", resp);})

      channel.on(`comments:${topicId}:new`,renderComments)

      document.querySelector('button').addEventListener('click', () =>{
          const content = document.querySelector('textarea').value;
          channel.push('comment:add', {content: content})
        });
    };        //const createSocket = (topicId)

    function renderComments(comments){
      const renderedComments = comments.map(comment => {
        return `
          <li class="collection-item">
            ${comment.content}-${comment.content}
          </li>
          `;
      });     //function renderComments

      document.querySelector('.collection').innerHTML = renderedComments.join('')
    }
function renderComment(event){
  const renderedComment = commentTemplate(event.comment);
  document.querySelector('.collection').innerHTML += renderedComment;
}
function commentTemplate(comment) {
  return `
    <li class="collection-item">
      ${comment.content}-
    </li>
    `;
}
window.createSocket = createSocket;
