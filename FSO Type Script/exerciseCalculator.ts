interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

const exerciseCalculator = (list: Array<number>, target: number): Result  => {
    
   const periodLength = list.length
   const trainingDays = list.filter(day => day > 0)
   

   const average = list.reduce((a , b) => a + b) / periodLength
   const success = average >= target
   const rating: number = average / target;
   const ratingDescription: string = rating >= 0.90 ? 'Amazing' : 'not too bad but could be better';
   
   


    return {
        periodLength,
        trainingDays: trainingDays.length,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }


}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))