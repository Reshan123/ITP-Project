import './skeleton.css'
const MessageSkeleton = () => {
  return (
    <>
      <div className="message-skeleton">
        <div className="flex gap-3 items-center">
          <div className="skeleton circle"></div>
          <div className="flex flex-col gap-1">
            <div className="skeleton"></div>
            <div className="skeleton"></div>
          </div>
        </div>
        <div className="flex gap-3 items-center justify-end">
          <div className="flex flex-col gap-1">
            <div className="skeleton"></div>
          </div>
          <div className="skeleton circle"></div>
        </div>
      </div>
    </>
  );
};
export default MessageSkeleton;
