import { useState } from "react";
import { useTranslation } from "react-i18next";
import SymptomChecker from "./SymptomChecker";
import SolutionViewer from "./SolutionViewer";

const ProblemDiagnoser = () => {
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { t } = useTranslation();

  const plantOptions = [
    { value: "tomato", label: t("diagnosis.plants.tomato") },
    { value: "cucumber", label: t("diagnosis.plants.cucumber") },
    { value: "lettuce", label: t("diagnosis.plants.lettuce") },
    { value: "corn", label: t("diagnosis.plants.corn") },
    { value: "bean", label: t("diagnosis.plants.bean") },
    { value: "potato", label: t("diagnosis.plants.potato") },
    { value: "pepper", label: t("diagnosis.plants.pepper") },
    { value: "carrot", label: t("diagnosis.plants.carrot") },
  ];

  const handlePlantChange = (e) => {
    setSelectedPlant(e.target.value);
    setSelectedSymptoms([]);
    setDiagnosisResult(null);
  };

  const handleSymptomToggle = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleDiagnose = async () => {
    if (selectedSymptoms.length === 0) return;

    setLoading(true);

    // Mock API call - replace with actual diagnosis API
    setTimeout(() => {
      // Mock result based on selected symptoms
      const result = {
        problemName: selectedSymptoms.includes("yellowLeaves")
          ? t("diagnosis.problems.nutrientDeficiency")
          : selectedSymptoms.includes("spots")
          ? t("diagnosis.problems.fungalDisease")
          : t("diagnosis.problems.pestInfestation"),
        description: selectedSymptoms.includes("yellowLeaves")
          ? t("diagnosis.descriptions.nutrientDeficiency")
          : selectedSymptoms.includes("spots")
          ? t("diagnosis.descriptions.fungalDisease")
          : t("diagnosis.descriptions.pestInfestation"),
        solutions: [
          selectedSymptoms.includes("yellowLeaves")
            ? t("diagnosis.solutions.addFertilizer")
            : selectedSymptoms.includes("spots")
            ? t("diagnosis.solutions.applyFungicide")
            : t("diagnosis.solutions.usePesticide"),
          t("diagnosis.solutions.improveAirCirculation"),
          t("diagnosis.solutions.adjustWatering"),
        ],
        preventionTips: [
          t("diagnosis.prevention.regularInspection"),
          t("diagnosis.prevention.properSpacing"),
          t("diagnosis.prevention.healthySoil"),
        ],
        severity:
          selectedSymptoms.length > 2
            ? "high"
            : selectedSymptoms.length > 1
            ? "medium"
            : "low",
        image: "https://via.placeholder.com/600x400?text=Plant+Problem",
      };

      setDiagnosisResult(result);
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const resetDiagnosis = () => {
    setSelectedSymptoms([]);
    setDiagnosisResult(null);
    setStep(1);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {t("diagnosis.title")}
        </h2>

        <div className="mb-6">
          {" "}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("diagnosis.selectPlant")}
          </label>
          <select
            value={selectedPlant}
            onChange={handlePlantChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-leaf-green focus:border-leaf-green"
          >
            <option value="">{t("diagnosis.choosePlant")}</option>
            {plantOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {step === 1 && selectedPlant && (
          <SymptomChecker
            plantType={selectedPlant}
            selectedSymptoms={selectedSymptoms}
            onSymptomToggle={handleSymptomToggle}
            onDiagnose={handleDiagnose}
            isLoading={loading}
          />
        )}

        {step === 2 && diagnosisResult && (
          <SolutionViewer
            result={diagnosisResult}
            onReset={resetDiagnosis}
            plantType={selectedPlant}
          />
        )}
      </div>
    </div>
  );
};

export default ProblemDiagnoser;
