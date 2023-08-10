import { Icon } from '@rneui/themed'

const prettyPrintNurseSpecialities = (nurse) => {
    return nurse.specialities.map((item, i) => `${item}${i == nurse.specialities.length - 1 ? '' : ', '}`)
}

const prettyPrintNurseRatings = (nurse) => {
    const ints = Math.floor(nurse.rating)
    const decs = nurse.rating % 1
    const stars = []

    for (let i = 0; i < ints; ++i) {
        stars.push(<Icon name='star' type='font-awesome' color='gold' />)
    }

    if (decs > 0.00) {
        stars.push(<Icon name='star-half' type='font-awesome' color='gold' />)
    }

    return stars
}


export { prettyPrintNurseRatings, prettyPrintNurseSpecialities }