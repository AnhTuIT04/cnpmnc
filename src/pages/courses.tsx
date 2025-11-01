import Sidebar from "@/components/shared/sidebar";

export default function Courses() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Khóa học</h1>

          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <p className="text-gray-600">Danh sách khóa học sẽ được hiển thị ở đây.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
