import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { Form, Input, Button, Card, Row, Col, message, Result } from "antd";
import { MailOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useAuth } from "../auth-context";

export function meta() {
  return [
    { title: "Forgot Password - TicketLine Portal" },
    { name: "description", content: "Reset your password" },
  ];
}

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useAuth();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulate sending reset email
      message.success("Password reset link sent to your email!");
      setSubmitted(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#e9e9e9", padding: "1rem" }}>
      <Row gutter={[16, 16]} style={{ width: "100%", maxWidth: "400px" }}>
        <Col xs={24}>
          <Card
            style={{
              borderTop: "4px solid #d70000",
              boxShadow: "0 1px 0 rgba(0, 0, 0, 0.03)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <img 
                src="/images/ticketlineLogo.png" 
                alt="TicketLine Logo" 
                style={{ width: "50%", margin: "0 auto 2rem" }} 
              />
              <h1 style={{ fontSize: "1.25rem", fontWeight: "800", margin: "0.2rem 0", letterSpacing: "0.04em" }}>
                RECUPERAR PASSWORD
              </h1>
              <p style={{ fontSize: "0.82rem", color: "#7a7a7a", margin: "0.5rem 0 0" }}>
                {submitted
                  ? "Verifique seu email para continuar"
                  : "Insira o seu email para receber instruções de recuperação"}
              </p>
            </div>

            {!submitted ? (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
              >
                <Form.Item
                  label="EMAIL"
                  name="email"
                  labelCol={{ style: { fontSize: "0.69rem", fontWeight: "700", letterSpacing: "0.08em" } }}
                  rules={[
                    { required: true, message: "Por favor insira o seu email" },
                    { type: "email", message: "Email inválido" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="seu@email.com"
                    size="large"
                    autoComplete="email"
                    style={{ minHeight: "44px" }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    style={{
                      minHeight: "44px",
                      fontSize: "0.9rem",
                      fontWeight: "700",
                      background: "#d70000",
                      borderColor: "#d70000",
                    }}
                  >
                    SEND RESET LINK
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <Result
                icon={<CheckCircleOutlined style={{ color: "#388e3c" }} />}
                title="Success"
                subTitle="Password reset link has been sent to your email. Redirecting to login in 3 seconds..."
                style={{ padding: "2rem 0" }}
              />
            )}

            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #e2e2e2", textAlign: "center" }}>
              <div style={{ fontSize: "0.78rem", marginBottom: "0.5rem" }}>
                Remember your password?{" "}
                <Link to="/login" style={{ color: "#d70000", textDecoration: "none" }}>
                  Login here
                </Link>
              </div>
              <div style={{ fontSize: "0.78rem" }}>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#d70000", textDecoration: "none" }}>
                  Register here
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
