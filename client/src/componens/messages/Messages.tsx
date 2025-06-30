import { MessagesT } from '../../types/messages/MessagesT';

export default function Messages({
  friendId,
  chatData,
}: MessagesT) {
  return (
    <>
      <h1>All messages for: {friendId}</h1>

      <section className="flex flex-col-reverse max-h-[70vh] h-full overflow-y-scroll custom-x-scroll gap-2">
        {chatData
          .filter(d => d.to === friendId || d.from === friendId)
          .map((d, idx) => (
            <div className={`flex ${d.from === friendId ? 'mr-auto' : 'ml-auto'}`}>
              <p
                key={idx}
                className={`text-amber-300 rounded-md word-wrap p-2 ${d.from === friendId ? 'bg-black/75' : 'bg-black/25'}`}
              >
                {d.content}
              </p>
            </div>
          ))
        }
      </section>
    </>
  );
}
