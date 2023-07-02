import * as React from "react"

interface EmailTemplateProps {
  firstName: string
  team: string
  url: string
}

export const InviteMember: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  team,
}) => (
  <div>
    <h1>Hey, {firstName}!</h1>
    <p>
      You have been invited to join the team <strong>{team}</strong> on loglib.
    </p>
    
  </div>
)
