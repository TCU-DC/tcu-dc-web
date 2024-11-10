function PostCategory({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex h-7 w-fit items-center rounded-sm bg-black px-2 text-base font-bold text-white">
      {children}
    </div>
  );
}

export default PostCategory;
