import React, { useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Plus, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmployeeActionsDropdown from "@/components/Employee.Drop/EmployeeDropDown";
import Sidebar from "@/components/shared/sidebar";
import { useQuery } from "@tanstack/react-query";
import { getCriteriaList } from "@/service/api/criteria/get-list";
import type { Criteria as CriteriaType } from "@/service/api/criteria/get-list/types";
import { getEmployeeList } from "@/service/api/employee/get-list";
import type { Employee } from "@/service/api/employee/get-list/types";

interface ScoreFormData {
  criteriaId: number;
  score: number;
  comment: string;
}

interface AssessmentFormData {
  employeeId: string;
  scores: ScoreFormData[];
}

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1); // UI page starts from 1
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<AssessmentFormData>({
    employeeId: "",
    scores: [
      {
        criteriaId: 0,
        score: 0,
        comment: "",
      },
    ],
  });

  const { data: criteriaData } = useQuery({
    queryKey: ["criteria"],
    queryFn: () => getCriteriaList({}),
  });

  const {
    data: employeeData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees", page, perPage],
    queryFn: () => getEmployeeList({ page: page - 1, size: perPage }), // Convert to 0-based page
  });

  const criteriaList: CriteriaType[] = criteriaData?.payload?.data || [];
  const employees: Employee[] = employeeData?.content || [];
  const totalPages = employeeData?.totalPages || 0;
  const totalElements = employeeData?.totalElements || 0;

  const handleViewAssessments = (employeeId: number) => {
    navigate(`/assessments/${employeeId}`);
  };

  // Filter employees by search term (client-side filtering)
  const filtered = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toString().includes(search),
  );

  // const handleOpenAssessmentModal = (employeeId: string) => {
  //   setFormData({
  //     employeeId: employeeId,
  //     scores: [
  //       {
  //         criteriaId: 0,
  //         score: 0,
  //         comment: "",
  //       },
  //     ],
  //   });
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      employeeId: "",
      scores: [
        {
          criteriaId: 0,
          score: 0,
          comment: "",
        },
      ],
    });
  };

  const handleAddScore = () => {
    setFormData({
      ...formData,
      scores: [
        ...formData.scores,
        {
          criteriaId: 0,
          score: 0,
          comment: "",
        },
      ],
    });
  };

  const handleRemoveScore = (index: number) => {
    setFormData({
      ...formData,
      scores: formData.scores.filter((_, i) => i !== index),
    });
  };

  const handleScoreChange = (index: number, field: keyof ScoreFormData, value: number | string) => {
    const newScores = [...formData.scores];
    newScores[index] = {
      ...newScores[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      scores: newScores,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.employeeId && formData.scores.length > 0) {
      // Validate all scores have criteriaId and score
      const isValid = formData.scores.every(
        (score) => score.criteriaId > 0 && score.score > 0 && score.comment.trim() !== "",
      );
      if (isValid) {
        console.log("Submit assessment:", formData);
        // TODO: Call API to create assessment
        handleCloseModal();
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-hidden">
        <div className="p-8  h-screen ">
          <div className="p-6 bg-white shadow-lg rounded-xl max-w-full h-screen">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Danh sách nhân viên</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition">
                <FaPlus /> Thêm nhân viên
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <div className="relative w-full md:max-w-xs">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc mã"
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[5, 10, 20].map((n) => (
                  <option key={n} value={n}>
                    {n}/trang
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="size-8 animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
                </div>
              )}

              {error && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 font-semibold">Lỗi: Không thể tải danh sách nhân viên</p>
                </div>
              )}

              {!isLoading && !error && (
                <>
                  <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wide">
                      <tr>
                        <th className="px-4 py-3 text-left">ID</th>
                        <th className="px-4 py-3 text-left">Tên nhân viên</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-center">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((emp) => (
                        <tr key={emp.id} className="border-t hover:bg-gray-50 transition">
                          <td className="px-4 py-3 font-medium">{emp.id}</td>
                          <td className="px-4 py-3 font-medium">{emp.name}</td>
                          <td className="px-4 py-3 text-gray-600">{emp.email}</td>
                          <td className="px-4 py-3 text-center">
                            <EmployeeActionsDropdown
                              onViewAssessments={() => handleViewAssessments(emp.id)}
                              onEdit={() => alert(`Chỉnh sửa ${emp.name}`)}
                              onDelete={() => confirm(`Bạn chắc chắn muốn xoá ${emp.name}?`)}
                            />
                          </td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center text-gray-400 py-6">
                            {search ? "Không tìm thấy nhân viên phù hợp." : "Chưa có nhân viên nào."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-600">
                        Hiển thị {(page - 1) * perPage + 1} - {Math.min(page * perPage, totalElements)} trong tổng số{" "}
                        {totalElements} nhân viên
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Trước
                        </button>
                        <span className="px-3 py-2 text-sm text-gray-700">
                          Trang {page} / {totalPages}
                        </span>
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page >= totalPages}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Sau
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modal Thêm Đánh Giá */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-white/30"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Thêm đánh giá mới</h3>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Nhân viên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.employeeId}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Danh sách tiêu chí đánh giá <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAddScore}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition"
                    >
                      <Plus className="size-4" /> Thêm tiêu chí
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.scores.map((score, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-semibold text-gray-700">Tiêu chí #{index + 1}</span>
                          {formData.scores.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveScore(index)}
                              className="text-red-600 hover:text-red-800 transition"
                            >
                              <X className="size-4" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Tiêu chí <span className="text-red-500">*</span>
                            </label>
                            <select
                              required
                              value={score.criteriaId || ""}
                              onChange={(e) => handleScoreChange(index, "criteriaId", Number(e.target.value))}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Chọn tiêu chí</option>
                              {criteriaList.map((criteria) => (
                                <option key={criteria.criteriaId} value={criteria.criteriaId}>
                                  {criteria.name} (ID: {criteria.criteriaId})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Điểm <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              required
                              min="0"
                              max="100"
                              value={score.score || ""}
                              onChange={(e) => handleScoreChange(index, "score", Number(e.target.value))}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="0-100"
                            />
                          </div>
                        </div>

                        <div className="mt-3">
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Nhận xét <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            required
                            value={score.comment}
                            onChange={(e) => handleScoreChange(index, "comment", e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập nhận xét..."
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                  >
                    Tạo đánh giá
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
