import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "GabiBreda <contato@gabibreda.com.br>",
      to: "contato1@gabibreda.com.br",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });
    await email.send({
      from: "GabiBreda <contato@gabibreda.com.br>",
      to: "contato1@gabibreda.com.br",
      subject: "ÚLTIMO EMAIL ENVIADO",
      text: "CORPO DO ÚLTIMO EMAIL ENVIADO.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@gabibreda.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato1@gabibreda.com.br>");
    expect(lastEmail.subject).toBe("ÚLTIMO EMAIL ENVIADO");
    expect(lastEmail.text).toBe("CORPO DO ÚLTIMO EMAIL ENVIADO.\r\n");
  });
});
