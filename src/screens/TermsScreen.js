import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import Card from "../components/Card";
import CardSection from "../components/CardSection";

class TermsScreen extends Component {
  makeBulletRow(data) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text>{`\u2022`}</Text>
        <Text style={{ flex: 1, paddingLeft: 5 }}>
          {data}
          {"\n"}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "#CFE3E9" }}>
        <Card>
          <CardSection>
            <Text style={styles.textHeader}>Personuppgiftspolicy</Text>
            <Text style={styles.textSubHeader}>
              Information om behandling av personuppgifter inom Bibliuteket
              {"\n"}
            </Text>
            <Text>
              Bibliuteket samlar in och använder uppgifter som kan kopplas till
              våra användare, så kallade personuppgifter. Det är vårt yttersta
              ansvar att behandla uppgifterna på ett säkert och användarvänligt
              sätt i enlighet med både rättsliga krav och de förväntningar våra
              användare har.{"\n"}
            </Text>
            <Text style={styles.textSubHeader}>
              Vad använder Bibliuteket mina uppgifter till?{"\n"}
            </Text>
            <Text>
              På Bibliueteket samlar vi in och använder personuppgifter för att
              alltid kunna erbjuda våra användare de bästa digitala tjänsterna.
              I allmänhet använder vi uppgifter för att:{"\n"}
            </Text>
            {this.makeBulletRow(
              "verifiera att våra användare studerar på Linköpings universitet;"
            )}
            {this.makeBulletRow("automatisera applikationens flöde;")}
            {this.makeBulletRow(
              "erbjuda tjänster som innefattar kontakt mellan användare;"
            )}
            <Text>
              När vi behandlar personuppgifter är det vår främsta uppgift att
              göra det på ett säkert och tillbörligt sätt i enlighet med de
              förväntningar våra användare har. Vi måste även uppfylla ett antal
              krav som uppställs i svensk och europeisk lagstiftning. Vidare
              måste vi se till att uppgifterna raderas när syftet med
              behandlingen är uppnådd.{"\n"}
            </Text>
            <Text style={styles.textSubHeader}>
              Hur längre lagrar Bibliueteket mina personuppgifter?{"\n"}
            </Text>
            <Text>
              Vi lagrar personuppgifter under en obestämd tid. Vi ska radera
              personuppgifter på begäran från användare. Vi tillhandahåller även
              en funktion för användare att radera sin personliga data.{"\n"}
            </Text>
            <Text style={styles.textSubHeader}>
              Användning av tredjepartsleverantörer{"\n"}
            </Text>
            <Text>
              Vi använder oss av Google Firebase som utför vissa uppgifter åt
              oss. Detta innebär att tjänsten kommer att ha tillgång till
              personuppgifter.{"\n"}
            </Text>
            <Text style={styles.textSubHeader}>
              Vilka rättigheter har jag – och hur nyttjar jag mina rättigheter?
              {"\n"}
            </Text>
            <Text>
              Du har starka rättigheter till dina uppgifter; du har rätt att få
              tillgång till dina personuppgifter. Du har också rätt att få
              rättelse eller i enlighet med lagen kräva radering av uppgifterna
              vi har om dig. Du kan även begära att behandlingen begränsas om du
              till exempel anser att behandlingen är olaglig. Du har även rätt
              att erhålla vissa uppgifter i ett digitalt format.{"\n\n"}
              Nedan finner du information om hur du kan nyttja dina rättigheter.
              {"\n"}
            </Text>
            {this.makeBulletRow(
              "Din rätt att få tillgång till de uppgifter vi behandlar om dig. Du har rätt att få tillgång till de uppgifter vi behandlar om dig. För att få tillgång till dessa kontaktar du oss på bibliuteket@gmail.com."
            )}
            {this.makeBulletRow(
              "Din rätt att få felaktiga uppgifter rättade. Du har rätt att få felaktiga uppgifter rättade. Du kan uppdatera dina uppgifter på din profil-sida."
            )}
            {this.makeBulletRow(
              "Din rätt att få uppgifter raderade. Du har som huvudregel rätt att få dina personuppgifter raderade. Detta kan du göra i inställningar."
            )}
            {this.makeBulletRow(
              "Din rätt att kopiera dina uppgifter i ett digitalt format. Du har under vissa omständigheter rätt att få uppgifter som du har gett oss i ett digitalt format."
            )}
            <Text style={styles.textSubHeader}>
              Om jag tidigare har lämnat samtycke till att mina personuppgifter
              behandlas av Bibliueteket, kan jag återkalla detta samtycke?{"\n"}
            </Text>
            <Text>
              Om du har lämnat samtycke till behandlingen av dina
              personuppgifter för specifika ändamål kan du när som helst
              återkalla ditt samtycke. Vi kommer då sluta behandla din
              information baserat på ditt samtycke.{"\n"}
            </Text>
            <Text style={styles.textSubHeader}>
              Klagomål, förbättringsförslag och andra frågor{"\n"}
            </Text>
            <Text>
              En av våra viktigaste uppgifter är att hantera data på ett säkert,
              användarvänligt och ansvarsfullt sätt. Om du är missnöjd, har
              förslag på hur vi kan förbättra oss eller andra frågor, kan du
              kontakta Bibliueteket på bibliuteket@gmail.com. {"\n\n"}
              Du har också rätt att lämna klagomål som rör vår behandling av
              dina personuppgifter till Datainspektionen.
            </Text>
          </CardSection>
        </Card>
      </ScrollView>
    );
  }
}
const styles = {
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  textSubHeader: {
    fontSize: 14,
    fontWeight: "bold"
  }
};
export default TermsScreen;
