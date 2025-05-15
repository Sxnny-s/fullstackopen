

const calculateBmi = (height: number, weight: number) : string => {

    const BMI = weight / ((height / 100) * (height / 100))
    console.log(BMI)

    if (BMI < 16.0) {
        return "Underweight (Severe thinness)";
    } else if (BMI >= 16.0 && BMI <= 16.9) {
        return "Underweight (Moderate thinness)";
    } else if (BMI >= 17.0 && BMI <= 18.4) {
        return "Underweight (Mild thinness)";
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        return "Normal range";
    } else if (BMI >= 25.0 && BMI <= 29.9) {
        return "Overweight (Pre-obese)";
    } else if (BMI >= 30.0 && BMI <= 34.9) {
        return "Obese (Class I)";
    } else if (BMI >= 35.0 && BMI <= 39.9) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }
} 

if (require.main === module) {
    const h = Number(process.argv[2]);
    const w = Number(process.argv[3]);

    if (isNaN(h) || isNaN(w)) {
        console.error("Malformatted parameters");
        process.exit(1);
    }

    console.log(calculateBmi(h, w));
}

export {calculateBmi}