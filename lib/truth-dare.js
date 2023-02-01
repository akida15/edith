const truth1 = `akida1,akida2`.split(','),
truth2 = `akida3,akida4`.split(','),
kt1 = `jeje1,jeje2`.split(','),
kt2 = `jeje3,jeje4`.split(','),
soal1 = `g`.split(','),
soal2 = `g`.split(','),
dare1 = `rori1,rori2`.split(','),
dare2 = `rori3,rori4`.split(',');
function dare(){
  const all_questions = [dare1, dare2], question_pack = all_questions[Math.floor(Math.random() * all_questions.length)], question = question_pack[Math.floor(Math.random() * question_pack.length)];
  return question;
}
function truth(){
  const all_questions = [truth1, truth2], question_pack = all_questions[Math.floor(Math.random() * all_questions.length)], question = question_pack[Math.floor(Math.random() * question_pack.length)];
  return question;
}
function kt(){
  const all_questions = [kt1, kt2], question_pack = all_questions[Math.floor(Math.random() * all_questions.length)], question = question_pack[Math.floor(Math.random() * question_pack.length)];
  return question;
}
function kt(){
  const all_questions = [soal1, soal2], question_pack = all_questions[Math.floor(Math.random() * all_questions.length)], question = question_pack[Math.floor(Math.random() * question_pack.length)];
  return question;
}
function amount_of_questions(type){
  if(type === 0){
    const all_questions = [truth1, truth2, tord_friend_questions, flirty_questions, dirty_questions, dare_normal_questions, more_normal_dare_questions, dare3, dare2];
    let amount = 0;
    for(const question_pack of all_questions){
      amount += question_pack.length;
    }
    return amount;
  }else if(type === 1){
    const truth_questions = [truth1, truth2, tord_friend_questions, flirty_questions, dirty_questions];
    let amount = 0;
    for(const question_pack of truth_questions){
      amount += question_pack.length;
    }
    return amount;
  }else if(type === 2){
    const dare_questions = [dare_normal_questions, more_normal_dare_questions, dare3, dare2];
    let amount = 0;
    for(const question_pack of dare_questions){
      amount += question_pack.length;
    }
    return amount;
  }else return null;
}
module.exports = {
  dare,
  truth,
  kt,
  amount_of_questions
}
