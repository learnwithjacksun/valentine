import { Models } from "appwrite"

export const createCardEmailTemplate = (card: Models.Document) => {
    return `
    <h1>Hello ${card.from},</h1>
    <p>Your valentine proposal has been created successfully and special for ${card.to}. You can view it <a href="${window.location.origin}/preview/${card.slug}">here</a></p>
    <p>Your secret word is: ${card.secret}</p>
    <p>You can delete your proposal at any time using the secret word.</p>  
    <p>Thank you for using BeMyVal!</p>
    <br>
    <br>
    <p>Jackson from BeMyVal</p>
    `
}

export const updateCardEmailTemplate = (card: Models.Document) => {
    return `
    <h1>Hello ${card.from},</h1>
    <p>${card.to} has accepted your valentine proposal. You can view it <a href="${window.location.origin}/preview/${card.slug}">here</a></p>
    <p>Your secret word is: ${card.secret}</p>
    <p>Thank you for using BeMyVal!</p>
    <br>
    <br>
    <p>Jackson from BeMyVal</p>
    `


}



