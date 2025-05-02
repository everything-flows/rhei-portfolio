export default function Info() {
  return (
    <section>
      <div className="flex items-center gap-6">
        <img
          className="size-20 rounded-full md:size-32"
          src="https://tnzycdohhtvupgagmwfx.supabase.co/storage/v1/object/public/rhei-resume//profile.png"
          alt="profile"
        />
        <div>
          <h1 className="text-h2">강다혜</h1>
          <p className="text-p text-gray-400 dark:text-gray-300">
            FRONT-END 개발자
          </p>
        </div>
      </div>
    </section>
  );
}
